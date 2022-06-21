<template>
    <div class="health-examination">
        <!-- 头部 -->
        <div class="header f j-c-b a-i-c">
            <div class="header-left">
                <img src="@/assets/icons/order-item-check.png" width="24px">
                体检预约
            </div>
            <div class="header-right">待支付</div>
        </div>
        <div class="content f">
            <img src="@/assets/images/order-img-check.png" width="52px" height="52px">
            <div class="info f-1">
                <div class="name-price f j-c-b">
                    <div>
                        健康风险评估检测
                    </div>
                    <div>
                        ¥399.00
                    </div>
                </div>
                <span class="num">*1</span>
            </div>
        </div>
        <div class="date-merchant">
            <div class="date">
                <span class="title">预约时间：</span>2021.03.01 08:00-08:30
            </div>
            <div class="merchant f">
                <span class="title">预约商家：</span>
                <div>浙江大学医学院附属第一医院(浙一医院)体检中心</div>
            </div>
        </div>
        <!-- 总计 -->
        <div class="total">
            共1件商品 合计：<span>¥399.00</span>
        </div>
        <!-- 按钮组 -->
        <div class="btns">
            <Button @click.native="cancel" width="84px" height="28px" fontColor="#333333" borderColor="#EEEEEE" bgColor="">取消订单</Button>
            <Button @click.native="pay" width="84px" height="28px" fontColor="#FF661A" borderColor="#FF661A" bgColor="">立即付款</Button>
        </div>
    </div>
</template>

<script>
import Button from "@/components/Button";
export default {
    name: "HealthExamination",
    components: { Button },
    data() {
        return {

        }
    },
    methods: {
        cancel() {
            console.log("cancel...")
        },
        pay() {
            console.log("pay...")
        }
    }
}
</script>

<style lang="scss" scoped>
.health-examination {
    padding: 12px 16px;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 8px;
    .header {
        padding-bottom: 12px;
        border-bottom: 1px solid #eeeeee;
        .header-left {
            color: $black-main-color;
            font-size: 13px;
            line-height: 18px;
            img {
                vertical-align: middle;
                margin-right: 2px;
            }
        }
        .header-right {
            color: $black-main-color;
            font-size: 13px;
            font-weight: 500;
            line-height: 18px;
        }
    }
    .content {
        margin: 12px 0;
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 8px;
        }
        .name-price {
            display: flex;
            font-size: 15px;
            font-weight: 600;
            color: $black-main-color;
            line-height: 18px;
        }
        .num {
            font-size: 12px;
            color: $black-three-color;
            line-height: 17px;
        }
    }
    .date-merchant {
        background-color: #f5f6f7;
        border-radius: 4px;
        padding: 12px 16px;
        font-size: 13px;
        color: $black-main-color;
        line-height: 18px;

        .title {
            display: inline-block;
            width: 70px;
        }
        .merchant {
            div {
                flex: 1;
            }
        }
    }
    .total {
        font-size: 13px;
        color: $black-main-color;
        line-height: 18px;
        text-align: right;
        margin: 12px 0;
        span {
            font-weight: 600;
        }
    }
    .btns {
        text-align: right;
        .btn:last-of-type {
            margin-left: 10px;
        }
    }
}
</style>