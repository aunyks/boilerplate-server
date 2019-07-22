module.exports = () => {
  return (req, res, next) => {
    res.set({
      'X-XSS-Protection': '1',
      'X-Frame-Options': 'DENY',
      'X-Powered-By': 'aunyks'
    })
    next()
  }
}