<template>
    <div class="placeholderInfoBox">
        <el-row>
            <h1 style="font-size:18px;">Platzhalter</h1>
            <span style="font-size:14px">
                Um die Dialoge zu finden, in denen die hier aufgeführten Platzhalter verwendet werden, muss die
                Suchfunktion genutzt werden.
                Die Platzhalter stehen im folgenden Format im Antworttext:
            </span>
            <p style="font-size:14px"><span
                    style=" color:#0DA4F0; font-weight: bold;text-transform: uppercase;font-size:13px">##[PLATZHALTERNAME]##</span>
            </p>
        </el-row>
    </div>
</template> 

<style lang="scss">
.placeholderInfoBox {
    background-color: white;
    padding: 15px 25px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h1 {
        margin-top: 0px;
        font-size: 18px;
        color: #303133;
    }
}
</style>