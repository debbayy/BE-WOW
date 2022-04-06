const { mylist, user, books } = require("../../models");

exports.addMyListBook = async (req, res) => {
  try {
    const dataBook = req.body;

    const data = await mylist.create({
      idUser: req.user.id,
      idBook: dataBook.idBook,
    });

    const getMylistBook = await mylist.findAll({
      where: {
        idUser: data.idUser,
      },
      attributes: {
        exclude: ["createAt", "updateAt"],
      },
      include: {
        model: books,
        as: "books",
        attributes: {
          exclude: ["createAt", "updateAt"],
        },
      },
    });

    res.send({
      status: "success",
      data: getMylistBook,
    });
  } catch (error) {
    console.log(error);
  }
};
