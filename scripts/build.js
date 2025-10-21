const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const assetsDir = path.join(rootDir, 'assets');
const buildAssetsDir = path.join(buildDir, 'assets');

async function build() {
    try {
        // 1. Clean build directory
        console.log('Cleaning build directory...');
        await fs.remove(buildDir);
        console.log('Build directory cleaned.');

        // 2. Create necessary directories
        console.log('Creating build directories...');
        await fs.ensureDir(path.join(buildAssetsDir, 'css'));
        await fs.ensureDir(path.join(buildAssetsDir, 'js'));
        await fs.ensureDir(path.join(buildAssetsDir, 'fonts'));
        await fs.ensureDir(path.join(buildAssetsDir, 'data'));
        await fs.ensureDir(path.join(buildAssetsDir, 'projects'));
        console.log('Build directories created.');

        // 3. Minify CSS
        console.log('Minifying CSS...');
        execSync(`cmd.exe /c npx clean-css-cli -o ${path.join(buildAssetsDir, 'css', 'style.min.css')} ${path.join(assetsDir, 'css', 'style.css')}`, { stdio: 'inherit' });
        console.log('CSS minified.');

        // 4. Minify and bundle JS
        console.log('Minifying and bundling JavaScript...');
        const jsFiles = fs.readdirSync(path.join(assetsDir, 'js')).filter(file => file.endsWith('.js')).map(file => path.join(assetsDir, 'js', file));
        execSync(`cmd.exe /c npx uglifyjs ${jsFiles.join(' ')} -m -o ${path.join(buildAssetsDir, 'js', 'main.min.js')}`, { stdio: 'inherit' });
        console.log('JavaScript minified and bundled.');

        // 5. Copy other assets
        console.log('Copying other assets...');
        await fs.copy(path.join(assetsDir, 'logo.svg'), path.join(buildAssetsDir, 'logo.svg'));
        await fs.copy(path.join(assetsDir, 'profile_image.png'), path.join(buildAssetsDir, 'profile_image.png'));
        await fs.copy(path.join(assetsDir, 'Abdelrahman_Mahmoud.pdf'), path.join(buildAssetsDir, 'Abdelrahman_Mahmoud.pdf'));
        // await fs.copy(path.join(assetsDir, 'fonts'), path.join(buildAssetsDir, 'fonts'));
        await fs.copy(path.join(assetsDir, 'data'), path.join(buildAssetsDir, 'data'));
        await fs.copy(path.join(assetsDir, 'projects'), path.join(buildAssetsDir, 'projects'));
        console.log('Other assets copied.');

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
