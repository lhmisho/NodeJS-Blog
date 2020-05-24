const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')


const routes = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                massage: 'Welcome to new blog'
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        app.use(r.path, r.handler)
    })
}