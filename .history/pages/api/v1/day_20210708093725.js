export default function (req, res) {
    return new Promise(function (resolve) {
      res.send(req.body.text);
      resolve();
    });
}
  