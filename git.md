## 简介
有三个仓库区域    
工作区域 ---  暂存区域  ---  版本区域  
工作区域可以对应电脑上coding的文件夹，然后被git管理；暂存区域可以理解为一个暂时性存放版本文件的地方，因为可能会有很多操作，所以先放到暂存区里面，到时候统一提交；版本区域就是最后提交的区域，管理着各个版本的文件；
## 创建仓库和提交
### 第一步 ： 新建一个空目录
### 第二步 ：命令  `git init` 把该目录变成git可以管理的仓库
### 第三步 ： `git add 文件名` 把文件添加到暂存区域  `git add .`  可以添加所有文件  
`git status` 查看文件状态，添加到暂存区之后会变绿色，没有添加的变红
### 第四步 ：`git commit -m 描述` 提交到提交区域
以上就完成了文件的提交
### 举个例子
在仓库目录下创建一个`git.txt`文件，里面写上 `git init 创建一个git可以管理的仓库`  
执行上述的步骤就能够提交到仓库
## 版本管理
### 版本回退
* `git diff` 查看新文件与提交区文件的内容差别
* `git log` 查看历史版本
* `git reset --hard HEAD^`回退到上一个版本 `HEAD^^`回退两个版本，`HEAD~100`回退100个版本,也可以使用版本号定位
``` 
    $ git reset --hard HEAD^
    HEAD is now at 1942b2f first commit
    at后面跟的就是版本号
```
* `git reflog` 查看历史命令
* 撤销操作--分为两种情况
> 撤销工作区的内容，`git checkout -- 文件名`  
> 撤销暂存区的内容, `git reset HEAD 文件名 `
或者 ` git restore --staged <file> `git 2.23+ 
* 撤销暂存区内容之后还得撤销工作区内容
### 删除 
`git rm 文件` 就能够删除对应的文件；但是有时候会误删，这时候就可以去版本库找回，让其回到工作区；
先切换到之前的版本，`git reset HEAD <file>` 再执行 `git checkout -- <file>` 就能够恢复删除的文件,如果不回退的话，`checkout`回退会找不到文件夹。恢复的前提是之前提交过；
## 远程仓库
远程仓库相当于一台24小时开机的服务器电脑，可以管理我们本地提交的并推送到远程的代码。最好用的平台是github。所以先注册一个github账号；
### 创建
设置全局的用户名和密码  
`git config --global user.email <email>`  
`git config --global user.password <password>`   
1. 获取SSH KEY 相当于秘钥，用来让远程仓库识别是由这个本地仓库提交的。打开git输入
`ssh-keygen -t rsa -C <emailAdress>` 输入在github上注册的邮箱，之后一直回车，按照默认设置；
2. 在`.ssh`文件目录下找到`id_rsa.pub`文件,这个是公开的。而另外一个文件`id_rsa`属于私密，不可以泄露；复制里面的内容；
3. 登录github，在Account Settings 的 SSH Keys页面，点击Add SSH Key；输入任意的title 并在Key框里面粘贴上面复制的秘钥；
### 同步
现在需要将本地的代码同步到github这个远程仓库中
1. 登录github，在右上角点击Create a new repo，创建一个仓库。输入仓库名称，其他按照默认设置；
2. 创建完成之后会有一段提示代码
```
$ git remote add origin git@github.com:xxx:xxx.git

origin后面是仓库地址
```
在git里面运行，这样就把远程仓库和本地仓库建立连接  
3. 把本地仓库推送到远程仓库；`git push -u origin master` 第一次使用需要添加 `-u` 之后再提交就不需要；`origin master`指的是远程仓库的`master`分支
### 克隆
不仅能够从本地提交，也能够从远程仓库同步到本地；
使用 `git clone <address>` 克隆该地址下的仓库；
在远程仓库的右上角有一个 `clone or download`
可以复制地址
### 远程仓库管理
`git remote` 可以查看远程仓库的信息
`git remote -v`可以查看可以推送的远程仓库地址,若为空就是没有这个地址
### 协作
如果有几个人同时维护一个项目，需要先从远程仓库克隆到本地仓库；
如果别人在分支上提交了代码，我再提交的时候可能会冲突；
所以有很多人一起维护一个项目的时候，
1. 首先使用`git push origin <name>`
2. 如果推送失败，需要 `git pull` 把项目拉取下来，尝试合并，并解决本地的文件冲突；
> 有时候pull会失败，原因是没有指定本地分支与远程分支的链接，按照提示基本能解决；
3. 重新提交一次
## 分支管理
之前的代码都是在`master`这个分支上进行操作的，也就是主分支；
分支可以理解为不同的时间线，相当于开辟一块不同的时间线，在该分支里面的操作，记录的版本是只会对该分支下的节点有影响，并不会影响到其他分支；等分支下的所有更改完成之后，合并到主分支上，再把分支删除；就相当于在主分支上操作了一样；但是其中的管理会十分方便。
### 创建与合并分支
1. 创建并切换到分支 `git checkout -b <name>`
2. 查看分支 `git branch` 前面带有※的就是当前分支
3. 切换分支 `git checkout <name>`
4. 把指定分支合并到当前分支 `git merge <name>`
5. 创建和切换分支在新版本中使用`switch`  
创建并切换`git switch -c <name>` 切换分支 `git switch <name>`
6. 删除分支 `git branch -d <name>`
7. 创建分支 `git branch <name>`
8. `git log --graph --pretty=oneline --abbrev-commit` 可以查看记录分支图

### 冲突
如果在分支中更改并提交了一个文件，然后在master分支中也更改并提价了相同的文件，但是两次更改不一致，使用合并的时候会发生冲突；
解决办法就是手动修改，让其一致；在代码冲突的地方会有标记 `<<<<<<<<< ======== >>>>>>>>>` 展示不同版本之间的冲突差异
### 分支策略
`master`是主要分支，不可以轻易更改；所以版本的变更都发生在分支比如`dev`上，而多人协作开发，提交代码可以在`dev`基础上创建各自的分支，所有的代码提交到`dev`上；

### 暂存目前的工作
当目前正在某个分支工作，但是突然要切换到其他分支上进行别的开发，此时还无法提交；可以使用 `git stash` 把当前的状态存储起来  
其他工作做完，需要继续执行的时候，`git stash pop` 可以切换到之前保存的状态；
`git stash` 可以多次执行 `git stash list` 可以查看都有哪些保存状态的任务；
```
$ git stash list
stash@{0}: WIP on master: 5153b69 after fixed
```
执行`git stash list`之后会出现保存状态的任务，如果要回复到某一条，可以执行 `git stash apply stash@{0}` 把最开始的那一段 `stash@{n}` 传进去
