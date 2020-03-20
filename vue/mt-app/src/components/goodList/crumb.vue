<template>
    <div class = "m-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name:'Index' }">
                {{ $store.state.position }}美团
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ $store.state.position }}美食
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>