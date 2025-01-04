const https = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/products', // Default path, bisa diubah saat pemanggilan
    method: 'GET',
};

const formatTable = (data) => {
    const products = Array.isArray(data) ? data : [data]; // Pastikan data berupa array
    console.log("+----+------------+-------+");
    console.log("| id | name       | price |");
    console.log("+----+------------+-------+");
    products.forEach(product => {
        console.log(`| ${product.id.toString().padEnd(3)} | ${product.name.padEnd(10)} | ${product.price.padStart(5)} |`);
    });
    console.log("+----+------------+-------+");
};

const fetchData = (path) => {
    options.path = path; // Update path
    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                formatTable(parsedData);
            } catch (error) {
                console.error('Error parsing response:', error.message);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request error:', error.message);
    });

    req.end();
};

const args = process.argv.slice(2); // Ambil path dari argumen CLI
if (args.length > 0) {
    fetchData(args[0]);
} else {
    console.log("Usage: node formatTable.js <API_PATH>");
}
