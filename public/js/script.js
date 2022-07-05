Kakao.init('f69b537d91867a1aee818115f9a39892');
Kakao.isInitialized();

document.getElementById('logout').style.display = 'none';


function kakaoLogin(){
    Kakao.Auth.login({
        success:function(response){
            Kakao.API.request({
                url:'/v2/user/me',
                success:function(response){
                    console.log(response);
                    document.getElementById('user').innerText=
                        response.kakao_account.profile.nickname + '님';
                    document.getElementById('login').style.display = 'none';
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                    document.getElementById('logout').style.display = 'block';
                }
            })
        }
    })

}

function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url:'/v1/user/unlink',
            success:function(response){
                console.log(response);
                document.getElementById('user').style.display = 'none';
                document.getElementById('login').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                alert('로그아웃 되었습니다.')
            }
        })
        Kakao.Auth.setAccessToken(undefined)
    }
}