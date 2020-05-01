// exports.dashboardGetController = (req, res, next) => {
//     res.render('pages/dashboard/dashboard.ejs', { title: 'Dashboard' })
// }
const Flash = require('../utilitiy/Flash')

exports.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard.ejs',
        {
            title: 'Create a new account',
            flashMassage: Flash.getMessage(req)
        }
    )
}