import express from 'express';
import { memberController } from '../controllers';

const memberRouter = express.Router();

memberRouter.post('/', memberController.addMemberHandler);

export default memberRouter;
