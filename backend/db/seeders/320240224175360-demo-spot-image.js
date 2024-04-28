"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        // The Town House Preview Image

        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Town%20House/Preview%20Image/town-house_j5wqvi.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 1

        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image3_vjracv.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 2

        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image2_yil3q2.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 3

        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862827/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image4_pojqnv.jpg",
        preview: true,
      },
      {
        // The Town House Img Detail 4

        spotId: 1,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image1_rrazw1.jpg",
        preview: true,
      },

      {
        // Shadow Estate Preview Image

        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Shadow%20Estate/Preview%20Image/shadow-estate_mc9uvu.jpg",
        preview: true,
      },
      {
        // Shadow Estate Img Detail 1

        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998525/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image3_kaavut.jpg",
        preview: true,
      },
      {
        // Shadow Estate Img Detail 2

        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998526/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image2_kuvope.jpg",
        preview: true,
      },
      {
        // Shadow Estate Img Detail 3

        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998526/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image1_gtnwuu.jpg",
        preview: true,
      },
      {
        // Shadow Estate Img Detail 4

        spotId: 2,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998528/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image4_daa6xy.jpg",
        preview: true,
      },
      {
        // The House of Night Preview Image

        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/House%20of%20Night/Preview%20Image/house-of-night_znawfo.jpg",
        preview: true,
      },
      {
        // The House of Night  Img Detail 1

        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002017/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image3_xlwato.jpg",
        preview: true,
      },
      {
        // The House of Night  Img Detail 2

        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002018/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image1_vifcmj.jpg",
        preview: true,
      },
      {
        // The House of Night  Img Detail 3

        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002019/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image4_mfkt3l.jpg",
        preview: true,
      },
      {
        // The House of Night  Img Detail 4

        spotId: 3,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002022/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image2_ee5f7v.jpg",
        preview: true,
      },
      {
        // Moonstone Palace Preview Image

        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Moonstone%20Palace/Preview%20Image/moonstone-palace_gn1xmr.jpg",
        preview: true,
      },
      {
        // Moonstone Palace Img Detail 1

        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002064/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image2_ycqmru.jpg",
        preview: true,
      },
      {
        // Moonstone Palace Img Detail 2

        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002066/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image1_dfqpyp.jpg",
        preview: true,
      },
      {
        // Moonstone Palace Img Detail 3

        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002068/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image3_exszun.jpg",
        preview: true,
      },
      {
        // Moonstone Palace Img Detail 4

        spotId: 4,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002070/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image4_yqszut.jpg",
        preview: true,
      },
      {
        // War College Castle Preview Image

        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862809/MythicalBnB%20API%20Project/War%20College%20Castle/Preview%20Image/war-college-castle_t6eqk9.jpg",
        preview: true,
      },
      {
        // War College Castle Img Detail 1

        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002177/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image4_cqndhh.jpg",
        preview: true,
      },
      {
        // War College Castle Img Detail 2

        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002180/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image1_uxkrwc.jpg",
        preview: true,
      },
      {
        // War College Castle Img Detail 3

        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002183/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image3_roosvo.jpg",
        preview: true,
      },
      {
        // War College Castle Img Detail 4

        spotId: 5,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002186/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image2_hqy54u.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion Preview Image

        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862808/MythicalBnB%20API%20Project/Nightfire%20Mansion/Preview%20Image/nightfire-mansion_qcgz92.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion Img Detail 1

        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258017/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image2_q8ppzf.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion Img Detail 2

        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258028/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image4_seoctj.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion Img Detail 3

        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258022/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image1_cbw3yv.jpg",
        preview: true,
      },
      {
        // Nightfire Mansion Img Detail 4

        spotId: 6,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258034/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image3_xj0hsr.jpg",
        preview: true,
      },
      {
        // River House Preview Image

        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862810/MythicalBnB%20API%20Project/River%20House/Preview%20Image/river-house_vagpfx.jpg",
        preview: true,
      },
      {
        // River House Img Detail 1

        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002142/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image2_mq8kfn.jpg",
        preview: true,
      },
      {
        // River House Img Detail 2

        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002145/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image3_hnpu1t.jpg",
        preview: true,
      },
      {
        // River House Img Detail 3

        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002147/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image4_qdla5y.jpg",
        preview: true,
      },
      {
        // River House Img Detail 4

        spotId: 7,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002150/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image1_xd8hug.jpg",
        preview: true,
      },
      {
        // Quaint Home Preview Image

        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Quaint%20Home/Preview%20Image/quaint-home_l6hbft.jpg",
        preview: true,
      },
      {
        // Quaint Home Img Detail 1

        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002111/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image1_c4r2g2.jpg",
        preview: true,
      },
      {
        // Quaint Home Img Detail 2

        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002114/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image2_cbraur.jpg",
        preview: true,
      },
      {
        // Quaint Home Img Detail 3

        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002115/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image3_rmunxt.jpg",
        preview: true,
      },
      {
        // Quaint Home Img Detail 4

        spotId: 8,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002118/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image4_vpx2oh.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia Preview Image

        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Preview%20Image/crown-of-nyaxia_dq4dwv.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia Img Detail 1

        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001979/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image1_jann0g.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia Img Detail 2

        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001979/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image4_yxazsy.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia Img Detail 3

        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001980/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image2_ybq3ol.jpg",
        preview: true,
      },
      {
        // Crown of Nyaxia Img Detail 4

        spotId: 9,
        url: "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001982/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image3_xg0j3c.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            // Town House
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Town%20House/Preview%20Image/town-house_j5wqvi.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image3_vjracv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image2_yil3q2.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862827/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image4_pojqnv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862826/MythicalBnB%20API%20Project/Town%20House/Spot%20Images/town-house-image1_rrazw1.jpg",
            // Shadow Estate
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Shadow%20Estate/Preview%20Image/shadow-estate_mc9uvu.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998525/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image3_kaavut.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998526/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image2_kuvope.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998526/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image1_gtnwuu.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1713998528/MythicalBnB%20API%20Project/Shadow%20Estate/Spot%20Images/shadow-estate-image4_daa6xy.jpg",
            // House of Night
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/House%20of%20Night/Preview%20Image/house-of-night_znawfo.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002017/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image3_xlwato.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002018/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image1_vifcmj.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002019/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image4_mfkt3l.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002022/MythicalBnB%20API%20Project/House%20of%20Night/Spot%20Images/house-of-night-image2_ee5f7v.jpg",
            // Moonstone Palace
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Moonstone%20Palace/Preview%20Image/moonstone-palace_gn1xmr.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002064/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image2_ycqmru.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002066/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image1_dfqpyp.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002068/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image3_exszun.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002070/MythicalBnB%20API%20Project/Moonstone%20Palace/Spot%20Images/moonstone-palace-image4_yqszut.jpg",
            // War College Castle
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862809/MythicalBnB%20API%20Project/War%20College%20Castle/Preview%20Image/war-college-castle_t6eqk9.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002177/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image4_cqndhh.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002180/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image1_uxkrwc.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002183/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image3_roosvo.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002186/MythicalBnB%20API%20Project/War%20College%20Castle/Spot%20Images/war-college-castle-image2_hqy54u.jpg",
            // Nightfire Mansion
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862808/MythicalBnB%20API%20Project/Nightfire%20Mansion/Preview%20Image/nightfire-mansion_qcgz92.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258017/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image2_q8ppzf.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258028/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image4_seoctj.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258022/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image1_cbw3yv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714258034/MythicalBnB%20API%20Project/Nightfire%20Mansion/Spot%20Images/nightfire-mansion-image3_xj0hsr.jpg",
            // River House
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862810/MythicalBnB%20API%20Project/River%20House/Preview%20Image/river-house_vagpfx.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002142/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image2_mq8kfn.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002145/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image3_hnpu1t.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002147/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image4_qdla5y.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002150/MythicalBnB%20API%20Project/River%20House/Spot%20Images/river-house-image1_xd8hug.jpg",
            // Quaint Home
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862811/MythicalBnB%20API%20Project/Quaint%20Home/Preview%20Image/quaint-home_l6hbft.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002111/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image1_c4r2g2.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002114/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image2_cbraur.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002115/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image3_rmunxt.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714002118/MythicalBnB%20API%20Project/Quaint%20Home/Spot%20Images/quaint-home-image4_vpx2oh.jpg",
            // Crown of Nyaxia
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1710862807/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Preview%20Image/crown-of-nyaxia_dq4dwv.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001979/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image1_jann0g.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001979/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image4_yxazsy.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001980/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image2_ybq3ol.jpg",
            "https://res.cloudinary.com/djqcfdrbm/image/upload/v1714001982/MythicalBnB%20API%20Project/Crown%20of%20Nyaxia/Spot%20Images/crown-of-nyaxia-image3_xg0j3c.jpg",
          ],
        },
      },
      {}
    );
  },
};
