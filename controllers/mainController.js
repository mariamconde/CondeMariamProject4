exports.index = (req, res) => {
    res.render("./main/index");
};

exports.show = (req, res) => {
    res.render("./main/about");
};

exports.update = (req, res) => {
    res.render("./main/contact");
};
