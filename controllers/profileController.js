class profileController {
    async profile(req, res) {
        try {
            console.log('profileController.profile')
            const user = req.user;

            return res.render('profile', {user});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new profileController()
