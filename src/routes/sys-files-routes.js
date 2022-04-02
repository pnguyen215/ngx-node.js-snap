const commons = require('../commons/commons');
const router = commons.express.Router();

let sysService = require('../services/sys-service');

router.post('/zip', sysService.zipDirectories);

router.get('/download-zip', sysService.downloadZip);

module.exports = router;