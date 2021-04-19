<template>
    <div>
        <view style="text-align: center;font-size: 18px;padding: 10px 0;">银行卡签约</view>
        <div class="cards">
        <div class="card-item">
            <p><img src="../../static/card/zhaoshang.png" alt="">
                <div>
                    <p>招商银行</p>
                    <p>信用卡</p>
                    <p>**** **** **** 0876</p>
                </div>
                <button>删除</button>
        </div>
        <div class="card-item">
            <p><img src="../../static/card/nongye.png" alt=""></p>
                <div>
                    <p>农业银行</p>
                    <p>信用卡</p>
                    <p>**** **** **** 0876</p>
                </div>
                <button>删除</button>
        </div>
        <div class="card-item">
            <p><img src="../../static/card/xingye.png" alt=""></p>
                <div>
                    <p>兴业银行</p>
                    <p>信用卡</p>
                    <p>**** **** **** 0876</p>
                </div>
                <button>删除</button>
        </div>
        </div>
        <div class="add">
            <navigator url="../yinhangka/index"><button><span>+</span>添加银行卡</button></navigator>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        }
    }
</script> 

<style>
    .card-item{display: flex;justify-content: flex-start;padding: 20px;align-items: center;margin: 10px;color: #ffffff;font-size: 16px;}
    .card-item>p{align-self: flex-start;border-radius: 50%;padding: 10px;background: #ffffff;display: flex;justify-content: center;align-items: center;}
    .card-item>p img{width: 25px;height: 25px;} 
    .card-item>div{flex: 1;margin-left: 10px;}
    .card-item>div p:nth-child(1){font-size: 18px;}
    .card-item>div p:nth-child(2){font-size: 14px;margin-bottom: 5px;}
    .card-item:nth-child(1){background: url(../../static/card/hong.png);background-size: 100% 100%;}
    .card-item:nth-child(2){background: url(../../static/card/lv.png);background-size: 100% 100%;}
    .card-item:nth-child(3){background: url(../../static/card/lna.png);background-size: 100% 100%;}
    .card-item>button{background: none;border: 1px solid #ffffff;color: #ffffff;font-size: 14px;line-height: 30px;border-radius: 0;}
    .add{display: flex;justify-content: center;align-items: center;margin-top: 50px;}
    .add button{color: #447FDF;border: 1px solid #447FDF;border-radius: 20px;width: 200px;height: 40px;display: flex;justify-content: center;align-items: center;font-size: 15px;background-color: #ffffff;}
    .add button span{margin-right: 20px;}
</style>
