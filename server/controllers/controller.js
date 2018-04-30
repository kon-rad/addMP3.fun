
/**
 * Post audio
 * @param req
 * @param res
 * @returns void
 */
export function postAudio(req, res) {
  res.json({ hi: 'post hi this is server', reqbody: req.body });
}
