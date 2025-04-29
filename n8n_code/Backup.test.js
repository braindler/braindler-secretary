const { createBackup, restoreBackup } = require('./Backup');
const fs = require('fs');

describe('Backup and Restore', () => {
    beforeEach(() => {
        // Create a dummy file for backup
        fs.writeFileSync('dummy.txt', 'This is a dummy file for testing.');
    });

    afterEach(() => {
        // Remove the dummy file and the backup file
        if (fs.existsSync('dummy.txt')) {
            fs.unlinkSync('dummy.txt');
        }
        if (fs.existsSync('backup.zip')) {
            fs.unlinkSync('backup.zip');
        }
    });

    it('should create a backup', async () => {
        await createBackup('.', 'backup.zip');
        expect(fs.existsSync('backup.zip')).toBe(true);
    });

    it('should restore a backup', async () => {
        await createBackup('.', 'backup.zip');
        fs.unlinkSync('dummy.txt'); // Simulate file deletion before restore
        await restoreBackup('backup.zip', '.');
        expect(fs.existsSync('dummy.txt')).toBe(true);
    });
});