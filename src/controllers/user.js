// import model here
const { user, profile } = require("../../models");

exports.addUser = async (req, res) => {
  // code here
  try {
    const data = req.body;
    const createdData = await user.create({
      ...data,
      role: "user",
      isSub: "false",
    });

    console.log(data);

    res.send({
      status: "success",
      data: {
        user: createdData.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      /*  include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      }, */

      /* where: {
        role: "user",
      }, */
      attributes: {
        exclude: ["role", "password", "createdAt", "updatedAt"],
      },
    });
    const data = users;
    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findOne({
      where: {
        id,
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    //responx
    res.send({
      status: "success",
      data: {
        user: data,
      },
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await user.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update user id: ${id} finished`,
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProfileUser = async (req, res) => {
  // code here
  try {
    const id = req.params.id;

    const data = await profile.findOne({
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
      include: {
        model: user,
        as: "user",
      },
    });

    console.log(data);

    res.send({
      status: "success",
      data: {
        profile: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};
