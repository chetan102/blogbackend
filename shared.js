class Shared {

    filteredPosts(arr){
        const  newArr = [];
         arr?.map((item) =>{
            const obj = {
                id:item._id,
                title:item.title,
                content:item.content,
                category:item.category,
                views:item.views,
                comments:item.comments,
                createdAt:item.createdAt
            }
            newArr.push(obj);
        })
        return newArr
    }

}
module.exports = Shared