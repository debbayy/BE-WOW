// import model here
const { user, profile, trans } = require("../../models");

exports.addTrans = async (req, res) => {
  // code here

  const transExise = await trans.findOne({
    where: {
      idUser: req.user.id,
    },
  });
  console.log(req.user.id);
  if (transExise) {
    return res.status(201).send({
      status: "Failed",
      message: "transaksi sudah ada",
    });
  }

  try {
    const data = req.body;
    const createTrans = await trans.create({
      ...data,
      accountNumber: data.accountNumber,
      transferProof: req.file.filename,
      remainingActive: "0",
      userStatus: "not Actived",
      paymentStatus: "pending",
      idUser: req.user.id,
    });

    //console.log(createTrans);

    const transaction = JSON.parse(JSON.stringify(createTrans));
    //console.log(transaction);

    //console.log(data);

    res.send({
      status: "Success",
      ...transaction,
      transferProof:
        "http://localhost:5000/uploads/transaksi/" + transaction.transferProof,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server error",
    });
  }
};

exports.getTrans = async (req, res) => {
  try {
    const transaction = await trans.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: [
            "email",
            "password",
            "role",
            "isSub",
            "createdAt",
            "updatedAt",
            "idUser",
          ],
        },
      },
      attributes: {
        exclude: ["idUser", "password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        transaction,
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

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await trans.findOne({
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: [
            "email",
            "password",
            "role",
            "createdAt",
            "updatedAt",
            "idUser",
          ],
        },
      },
      attributes: {
        exclude: ["idUser", "password", "createdAt", "updatedAt"],
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

exports.updateTrans = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body);

    let data;

    if (req.body.paymentStatus === "Cancel") {
      data = {
        remainingActive: "0",
        userStatus: "not Active",
        paymentStatus: req.body.paymentStatus,
      };
    }

    if (req.body.paymentStatus === "Approve") {
      data = {
        remainingActive: "30",
        userStatus: "Active",
        paymentStatus: req.body.paymentStatus,
      };
    }

    await trans.update(data, {
      where: {
        id,
      },
    });

    const datas = await trans.findOne({
      where: {
        id,
      },
      // include: {
      //   model: user,
      //   as: "user",
      //   attributes: {
      //     exclude: [
      //       "email",
      //       "password",
      //       "role",
      //       "isSub",
      //       "createdAt",
      //       "updatedAt",
      //       "idUser",
      //     ],
      //   },
      // },
      // attributes: {
      //   exclude: ["idUser", "password", "createdAt", "updatedAt"],
      // },
    });

    res.send({
      status: "success",
      message: `Update user id: ${id} finished`,
      data: datas,
    });
  } catch (err) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
