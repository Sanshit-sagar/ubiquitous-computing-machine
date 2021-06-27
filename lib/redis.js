import Redis from 'ioredis'

const redis = new Redis('redis://:51f764b2da8f4466972ac4d7ed2610f6@us1-enabled-mudfish-33256.upstash.io:33256')

// Redis.Command.setArgumentTransformer("hmset", (args) => {
//     if (args.length === 2) {
//       if (typeof Map !== "undefined" && args[1] instanceof Map) {
//         // utils is a internal module of ioredis
//         return [args[0]].concat(utils.convertMapToArray(args[1]));
//       }
//       if (typeof args[1] === "object" && args[1] !== null) {
//         return [args[0]].concat(utils.convertObjectToArray(args[1]));
//       }
//     }
//     return args;
// });

export default redis