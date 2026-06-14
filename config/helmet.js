const helmet = require('helmet');

module.exports = function (emProd) {
    return helmet({
        hidePoweredBy: true,
        frameguard: { action: 'deny' },
        noSniff: true,
        referrerPolicy: { policy: 'no-referrer' },
        hsts: emProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "https:", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                fontSrc: ["'self'", "https:"],
                objectSrc: ["'none'"],
                formAction: ["'self'"],
                frameAncestors: ["'none'"],
            },
        },
    });
};