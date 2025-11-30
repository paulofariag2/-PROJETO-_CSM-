function permit(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Não autorizado' });
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Acesso negado para seu perfil' });
    }
    next();
  };
}

module.exports = { permit };
