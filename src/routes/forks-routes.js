const commons = require('../commons/commons');
const router = commons.express.Router();

let forksService = require('../services/forks-service');

router.post('/new', forksService.createOne);

module.exports = router;