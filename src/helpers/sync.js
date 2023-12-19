"use strict"

// sync():

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE *
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */

    /* User */
    const User = require('../models/user')
    await User.deleteMany() // !!! Clear collection.
    await User.create({
        //"_id": "123456789101112",
        "username": "testUser1",
        "password": "123456Qwe+",
        "password2": "123456Qwe+",
        "email": "testUser1@site.com",
        "first_name": "testUser1",
        "last_name": "testUser1",
        "is_active": true,
        "is_admin": true
    })
    await User.create({
        //"_id": "123456789101113",
        "username": "testUser2",
        "password": "123456Qwe+",
        "password2": "123456Qwe+",
        "email": "testUser2@site.com",
        "first_name": "testUser2",
        "last_name": "testUser2",
        "is_active": true,
        "is_admin": false
    })
    await User.create({
        //"_id": "123456789101113",
        "username": "testUser3",
        "password": "123456Qwe+",
        "password2": "123456Qwe+",
        "email": "testUser3@site.com",
        "first_name": "testUser3",
        "last_name": "testUser3",
        "is_active": true,
        "is_admin": false
    })

    /* Category */
    const Category = require('../models/category')
    await Category.deleteMany() // !!! Clear collection.
    await Category.create({
        //"_id": "123456789101112455",
        "name": "Culture",
    })
    await Category.create({
        //"_id": "123456789101112456",
        "name": "Politics",
    })
    await Category.create({
        //"_id": "123496789101112455",
        "name": "Sports",
    })
    await Category.create({
        //"_id": "123496789101112450",
        "name": "IT",
    })
    await Category.create({
        //"_id": "323496789101112450",
        "name": "Science",
    })
    await Category.create({
        //"_id": "923496789101112450",
        "name": "Fashion",
    })
    await Category.create({
        //"_id": "123491789101112450",
        "name": "Health",
    })
    await Category.create({
        //"_id": "123496789191112450",
        "name": "Travel",
    })
    await Category.create({
        //"_id": "123426789101112450",
        "name": "Economics",
    })
    await Category.create({
        //"_id": "193496789101112450",
        "name": "History",
    })

    /* Contribution */
    // const Contribution = require('../models/contribution')
    // await Contribution.deleteMany() // !!! Clear collection.
    // await Contribution.create({
    //     //"_id": 1289496789101112450,
    //     "title": "deneme1",
    //     "author": "testUser1",
    //     "content": "deneme Content1",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 123426789101112450,
    //     "status": "p",
    //     "comments": [
    //         {
    //              "id": 1,
    //              "commentTitle": "Katilmiyorum",
    //              "answer": "Bence en büyük padisah Fatih degil, Yavuz'dur.",
    //              "writer": "Abuzittin Kilkuyruk"
    //         },
    //         {
    //              "id": 2,
    //              "commentTitle": "Ne alaka",
    //              "answer": "En büyük Kanuni, baska büyük yok",
    //              "writer": "Rifki Tekeli"
    //         },
    //         {
    //              "id": 3,
    //              "commentTitle": "Son zamanlar",
    //              "answer": "Abdulhamit zor zamanda geldi, büyük padisahlik yapti",
    //              "writer": "Sehmistan Küpeli"
    //         },
    //         {
    //              "id": 4,
    //              "commentTitle": "Hadi oradan",
    //              "answer": "Bos islerle ugrasmayi birakin. Önemli olan simdiki yönetim. Konsantremizi ona yönlendirmeliyiz.",
    //              "writer": "Fitnat Darendeli"
    //         }
    //     ]
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112451,
    //     "title": "deneme2",
    //     "author": "testUser2",
    //     "content": "deneme Content2",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 123496789191112450,
    //     "status": "p",
        
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112452,
    //     "title": "deneme3",
    //     "author": "testUser3",
    //     "content": "deneme Content3",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 923496789101112450,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112454,
    //     "title": "deneme4",
    //     "author": "testUser1",
    //     "content": "deneme Content4",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 923496789101112450,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112456,
    //     "title": "deneme5",
    //     "author": "testUser2",
    //     "content": "deneme Content5",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 923496789101112450,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112457,
    //     "title": "deneme6",
    //     "author": "testUser3",
    //     "content": "deneme Content6",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 923496789101112450,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112458,
    //     "title": "deneme7",
    //     "author": "testUser1",
    //     "content": "deneme Content7",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 923496789101112450,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112459,
    //     "title": "deneme8",
    //     "author": "testUser2",
    //     "content": "deneme Content8",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 123456789101112455,
    //     "status": "p",
    // })
    // await Contribution.create({
    //     //"_id": 1289496789101112420,
    //     "title": "deneme9",
    //     "author": "testUser3",
    //     "content": "deneme Content9",
    //     "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Topkapi_Palace_Seen_From_Harem.JPG/270px-Topkapi_Palace_Seen_From_Harem.JPG",
    //     "category": 123456789101112455,
    //     "status": "p",
    // })

    

    /* Finished */
    console.log('* Synchronized.')
}