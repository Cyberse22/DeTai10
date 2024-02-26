import axios from "axios"

export const endpoints = {
    //user
    login: 'o/token/',
    users: 'user/',
    user: (userId) => `user/${userId}/`,
    currentUser: 'user/current-user/',
    changePassword: (userId) => `user/${userId}/change-password/`,

    //thesis
    thesis: 'thesis/',
    notActiveThesis: 'thesis/not-active/',
    activeThesis: 'thesis/active/',
    getThesis: (thesisId) => `thesis/${thesisId}/`,
    statusThesis: (thesisId) => `thesis/${thesisId}/change-status/`,
    myThesis: 'thesis/my-thesis/',
    thesisScore: (thesisId) => `thesis/${thesisId}/get-score/`,
    addScore: (thesisId) => `thesis/${thesisId}/add-score/`,
    updateScore: (thesisId) => `thesis/${thesisId}/update-score/`,
    myScore: (thesisId) => `thesis/${thesisId}/my-score/`,
    updateThesis: (thesisId) => `thesis/${thesisId}/update-thesis`,
    uploadFile: (thesisId) => `thesis/${thesisId}/upload-files`,

    //council
    councils: 'council/',
    council: (councilId) => `council/${councilId}/`,
    councilMembers: (councilId) => `council/${councilId}/member-council/`,
    councilThesis: (councilId) => `council/${councilId}/thesis/`,
    updateCouncilThesis: (councilId) => `council/${councilId}/council-thesis/`,
    updateCouncilThesisMembers: (councilId) => `council/${councilId}/update-members/`,
    updateCouncilRole: (councilId) => `council/${councilId}/update-role/`,
    statusCouncil: (councilId) => `council/${councilId}/change-status/`,
    lectureCouncil: 'council/lecture-council/',
    lectureThesis: (councilId) => `council/${councilId}/lecture-thesis/`,
    addThesis: (councilId) => `council/${councilId}/add-thesis`,

    //other
    sendMail: 'thesis/send-mail/',
    plot: 'plot/'
}

export const authAPI = (accessToken) => axios.create({
    baseURL: "https://kietnguyen2226.pythonanywhere.com/",
    headers: {
        "Authorization" : `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "https://kietnguyen2226.pythonanywhere.com/"
})