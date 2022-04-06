// import model here
const { user, profile, books } = require("../../models");

exports.addBooks = async (req, res) => {
  //code here

  /* const data = await books.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (data) {
    return res.status(400).send({
      status: "failed",
      message: "title Already Exist",
    });
  }
 */
  try {
    const items = req.body;
    const createbook = await books.create({
      ...items,
      abautThisBook: req.files.abautThisBook[0].filename,
      image: req.files.image[0].filename,
    });

    const createbooks = JSON.parse(JSON.stringify(createbook));
    console.log(createbooks);

    res.send({
      status: "Success",
      ...createbooks,
      abautThisBook:
        "http://localhost:5000/uploads/books/" + createbooks.abautThisBook,
      image: "http://localhost:5000/uploads/image/" + createbooks.image,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let dataBook = await books.findAll();

    dataBook = JSON.parse(JSON.stringify(dataBook));

    dataBook = dataBook.map((item) => {
      return {
        ...item,
        //abautThisBook: process.env.FILE_BOOK + data.abautThisBook,
        image: process.env.FILE_PATH + item.image,
      };
    });

    console.log(dataBook);
    res.send({
      status: "success",
      data: dataBook,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await books.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(data);
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

    //responx
    res.send({
      status: "success",
      data: data,
    });

    //tangkap errorny
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await books.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update book id: ${id} finished`,
      data: req.body,
    });
  } catch (err) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await books.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete book id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
