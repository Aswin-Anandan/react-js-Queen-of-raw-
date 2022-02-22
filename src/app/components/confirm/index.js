import Confirmation from './confirmation';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(Confirmation);

export default function(confirmation, options = {}) {
  return confirm({ confirmation, ...options });
}
