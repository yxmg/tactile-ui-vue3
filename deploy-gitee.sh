yarn build &&
cd ./dist &&
git init &&
git add . &&
time=$(date "+%Y-%m-%d %H:%M:%S") && git commit -m "feat: 更新-${time}" &&
git branch -M main &&
# replace by your website repository
git remote add origin git@gitee.com:yxmg/tactile-ui-vue3-website.git &&
git push -f origin main &&
cd - &&
echo "部署完成，请手动部署"
start https://gitee.com/yxmg/tactile-ui-vue3-website/pages
# https://yxmg.gitee.io/tactile-ui-vue3-website/#/doc/dialog