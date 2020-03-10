import { config, library } from '@fortawesome/fontawesome-svg-core'
// import icons
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

// add icons to library.
library.add(faMapMarkerAlt, faEnvelope, faPhone, faFacebook, faTwitter, faInstagram)
