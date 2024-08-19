export function vouch(req, res) {
  const address = req.session.address;
  const callback = req.session.callback;
  res.redirect(callback + '#/success?address=' + address)
}