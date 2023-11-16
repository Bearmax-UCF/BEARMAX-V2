import { NodeMailgun } from 'ts-mailgun';
import constants from '../utils/constants';

const mailgun = new NodeMailgun();
mailgun.apiKey = constants.mailgun_api_key;
mailgun.domain = constants.mailgun_domain;
mailgun.fromEmail = 'no-reply@' + constants.mailgun_domain;
mailgun.fromTitle = 'BearMax Account Services';
mailgun.init();

export default mailgun;