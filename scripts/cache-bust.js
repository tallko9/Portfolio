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
    try {
        const items = readdirSync(dir);
        
        for (const item of items) {
            try {
                const fullPath = join(dir, item);
                const stat = statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    files.push(...findHTMLFiles(fullPath));
                } else if (stat.isFile() && item.endsWith('.html')) {
                    files.push(fullPath);
                }
            } catch (error) {
                // Ignorer les erreurs sur des fichiers/dossiers individuels
                console.warn(`⚠️  Impossible d'accéder à ${item}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`❌ Erreur lors de la lecture du dossier ${dir}: ${error.message}`);
    }
    
    return files;
}

// Fonction pour mettre à jour les versions dans un fichier HTML
function updateVersionsInFile(filePath, version) {
    try {
        let content = readFileSync(filePath, 'utf-8');
        let modified = false;
        
        // Pattern pour trouver les fichiers CSS et JS avec ?v=...
        // Utiliser replace() avec callback pour remplacer TOUTES les occurrences en une seule passe
        const cssPattern = /(href=["']([^"']+\.css)\?v=)([^"']+)(["'])/gi;
        const jsPattern = /(src=["']([^"']+\.js)\?v=)([^"']+)(["'])/gi;
        
        // Remplacer toutes les occurrences de versions CSS (une seule passe)
        const newCssContent = content.replace(cssPattern, (match, prefix, filePath, oldVersion, suffix) => {
            modified = true;
            return `${prefix}${version}${suffix}`;
        });
        
        // Remplacer toutes les occurrences de versions JS (une seule passe)
        content = newCssContent.replace(jsPattern, (match, prefix, filePath, oldVersion, suffix) => {
            modified = true;
            return `${prefix}${version}${suffix}`;
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
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour de ${filePath}: ${error.message}`);
        return false;
    }
}

// Fonction principale
function main() {
    try {
        console.log('🔄 Génération des versions de cache-busting...\n');
        
        const version = generateVersion();
        console.log(`Version générée: ${version}\n`);
        
        // Trouver tous les fichiers HTML
        const htmlFiles = findHTMLFiles(rootDir);
        
        if (htmlFiles.length === 0) {
            console.log('⚠️  Aucun fichier HTML trouvé - le script se termine sans erreur');
            console.log('ℹ️  Cela peut être normal si vous n\'avez pas de fichiers HTML dans le projet\n');
            process.exit(0); // Exit avec succès au lieu d'erreur
        }
        
        console.log(`📄 Fichiers HTML trouvés: ${htmlFiles.length}\n`);
        
        let updatedCount = 0;
        let errorCount = 0;
        
        // Mettre à jour chaque fichier HTML
        htmlFiles.forEach(file => {
            try {
                if (updateVersionsInFile(file, version)) {
                    updatedCount++;
                }
            } catch (error) {
                errorCount++;
                console.error(`❌ Erreur avec ${file}: ${error.message}`);
            }
        });
        
        console.log(`\n✅ ${updatedCount} fichier(s) mis à jour avec la version ${version}`);
        if (errorCount > 0) {
            console.log(`⚠️  ${errorCount} erreur(s) rencontrée(s) lors du traitement`);
        }
        console.log('✨ Cache-busting terminé !\n');
        
        // Ne pas faire échouer le build si certaines mises à jour ont échoué
        // Le script a réussi si au moins un fichier a été mis à jour
        if (updatedCount === 0 && errorCount > 0) {
            console.log('⚠️  Aucun fichier n\'a pu être mis à jour, mais le build continue...\n');
            process.exit(0); // Ne pas faire échouer le build
        }
    } catch (error) {
        console.error(`\n❌ Erreur fatale dans le script de cache-busting: ${error.message}`);
        console.error(error.stack);
        // Ne pas faire échouer le build même en cas d'erreur fatale
        // Le site peut fonctionner sans cache-busting
        console.log('⚠️  Le build continue sans cache-busting...\n');
        process.exit(0);
    }
}

// Exécuter le script
main();