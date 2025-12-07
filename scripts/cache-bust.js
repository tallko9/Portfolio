import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Fonction pour générer un hash basé sur le timestamp et le contenu des fichiers
function generateVersion() {
    const timestamp = Date.now();
    const hash = createHash('md5')
        .update(timestamp.toString())
        .digest('hex')
        .substring(0, 8);
    return hash;
}

// Fonction pour trouver tous les fichiers HTML
function findHTMLFiles(dir) {
    const files = [];
    const items = readdirSync(dir);
    
    for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            files.push(...findHTMLFiles(fullPath));
        } else if (stat.isFile() && item.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Fonction pour mettre à jour les versions dans un fichier HTML
function updateVersionsInFile(filePath, version) {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Pattern pour trouver les fichiers CSS et JS avec ?v=...
    const patterns = [
        // CSS: href="path/to/file.css?v=1.2"
        /(href=["']([^"']+\.css)\?v=)([^"']+)(["'])/gi,
        // JS: src="path/to/file.js?v=1.3"
        /(src=["']([^"']+\.js)\?v=)([^"']+)(["'])/gi,
    ];
    
    patterns.forEach(pattern => {
        const matches = content.matchAll(pattern);
        for (const match of matches) {
            const [fullMatch, prefix, filePath, oldVersion, suffix] = match;
            const newMatch = `${prefix}${version}${suffix}`;
            content = content.replace(fullMatch, newMatch);
            modified = true;
        }
    });
    
    // Si le fichier n'a pas de version, on l'ajoute (uniquement pour les fichiers locaux)
    // CSS sans version (exclure les CDN et fichiers externes)
    content = content.replace(
        /(href=["']([^"']+\.css))(["'])/gi,
        (match, prefix, filePath, suffix) => {
            // Ignorer les fichiers externes (http/https) et ceux qui ont déjà une version
            if (!match.includes('?v=') && !match.includes('http://') && !match.includes('https://')) {
                modified = true;
                return `${prefix}?v=${version}${suffix}`;
            }
            return match;
        }
    );
    
    // JS sans version (exclure les CDN et fichiers externes)
    content = content.replace(
        /(src=["']([^"']+\.js))(["'])/gi,
        (match, prefix, filePath, suffix) => {
            // Ignorer les fichiers externes (http/https) et ceux qui ont déjà une version
            if (!match.includes('?v=') && !match.includes('http://') && !match.includes('https://')) {
                modified = true;
                return `${prefix}?v=${version}${suffix}`;
            }
            return match;
        }
    );
    
    if (modified) {
        writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Mis à jour: ${filePath.replace(rootDir, '')}`);
        return true;
    }
    
    return false;
}

// Fonction principale
function main() {
    console.log('🔄 Génération des versions de cache-busting...\n');
    
    const version = generateVersion();
    console.log(`Version générée: ${version}\n`);
    
    // Trouver tous les fichiers HTML
    const htmlFiles = findHTMLFiles(rootDir);
    
    if (htmlFiles.length === 0) {
        console.log('❌ Aucun fichier HTML trouvé');
        process.exit(1);
    }
    
    console.log(`📄 Fichiers HTML trouvés: ${htmlFiles.length}\n`);
    
    let updatedCount = 0;
    
    // Mettre à jour chaque fichier HTML
    htmlFiles.forEach(file => {
        if (updateVersionsInFile(file, version)) {
            updatedCount++;
        }
    });
    
    console.log(`\n✅ ${updatedCount} fichier(s) mis à jour avec la version ${version}`);
    console.log('✨ Cache-busting terminé !\n');
}

// Exécuter le script
main();