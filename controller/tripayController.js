const {GetPaymentChannel} = require("../service/tripay/tripayService")

exports.GetPaymentChannel = async (req, res,next) => {
    try {
        const data = await GetPaymentChannel()
        return res.status(200).json({
            message: "Success",
            data
        })
    } catch (error) {
        next(error);
    }
}