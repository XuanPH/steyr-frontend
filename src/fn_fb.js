// https://github.com/J2TeamNNL/J2Team-Community
module.exports.baseFBApi = {
    lay_ds_gioi_tinh_trong_list_friend : {
        url : "https://graph.facebook.com/me/friends?limit=5000&fields=gender&access_token={token}",
        method: "GET"
    },
    lay_danh_sach_bai_viet: {
        url : "https://graph.facebook.com/{victimid}/feed?order=chronological&limit={limit}&fields=id&&access_token=",
        method: "GET"
    }
}