const fs = require('fs');

function baseToDecimal(value, base) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points) {
    const n = points.length;
    let constantTerm = 0n;
    
    console.log(`\nPerforming Lagrange interpolation with ${n} points:`);
    
    for (let i = 0; i < n; i++) {
        let numerator = 1n;
        let denominator = 1n;
        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                numerator = numerator * BigInt(-points[j].x);
                denominator = denominator * BigInt(points[i].x - points[j].x);
            }
        }
        
        const contribution = (BigInt(points[i].y) * numerator) / denominator;
        constantTerm += contribution;
        
        console.log(`  Point ${i+1}: contribution = ${contribution}`);
    }
    
    return constantTerm;
}

function solvePolynomial(data) {
    const { n, k } = data.keys;
    const points = [];
    
    console.log(`\nProcessing polynomial with n=${n}, k=${k} (degree=${k-1})`);
    
    for (let i = 1; i <= n; i++) {
        if (data[i.toString()]) {
            const x = parseInt(i);
            const base = parseInt(data[i.toString()].base);
            const value = data[i.toString()].value;
            const y = baseToDecimal(value, base);
            
            points.push({ x, y });
            console.log(`  Decoded point ${i}: (${x}, ${y}) [base ${base}: "${value}"]`);
        }
    }
    
    points.sort((a, b) => a.x - b.x);
    
    const kPoints = points.slice(0, k);
    
    console.log(`\nUsing ${k} points for polynomial of degree ${k-1}:`);
    kPoints.forEach(point => {
        console.log(`  (${point.x}, ${point.y})`);
    });
    
    const secret = lagrangeInterpolation(kPoints);
    
    return secret;
}

function main() {
    try {
        console.log("=== Test Case 1 ===");
        const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
        const secret1 = solvePolynomial(testCase1);
        console.log(`\nSecret for Test Case 1: ${secret1}`);
        
        console.log("\n" + "=".repeat(80) + "\n");
        
        console.log("=== Test Case 2 ===");
        const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));
        const secret2 = solvePolynomial(testCase2);
        console.log(`\nSecret for Test Case 2: ${secret2}`);
        
        console.log("\n" + "=".repeat(80));
        console.log("FINAL RESULTS:");
        console.log(`Test Case 1 Secret: ${secret1}`);
        console.log(`Test Case 2 Secret: ${secret2}`);
        
    } catch (error) {
        console.error('Error:', error.message);
        console.error(error.stack);
    }
}

main(); 