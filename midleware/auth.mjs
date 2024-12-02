export default function checkPermissions(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'Unauthorized' })
  } else if (!req.isAuthenticated() && !req.user) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    return next()
  }
}
