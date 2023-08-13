import { Constants } from "./constants"

export const PageData = (isLogined: boolean) => ( isLogined ? pageDataWhenLogined : pageDataWhenLogout );

const pageDataWhenLogout = [
    {
        name: '뉴스피드',
        link: '/', 
    },
    {
        name: '로그인',
        link: Constants.serverAddress + '/oauth2/authorization/google',
    },
]

const pageDataWhenLogined = [
    {
        name: '뉴스피드',
        link: '/', 
    },
    {
        name: '내 글',
        link: '/my', 
    },
    {
        name: '로그아웃',
        link: Constants.serverAddress + '/logout',
    },
]