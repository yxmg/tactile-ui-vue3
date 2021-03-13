yarn build &&
cd ./dist &&
git init &&
git add . &&
time=$(date "+%Y-%m-%d %H:%M:%S") && git commit -m "feat: 更新-${time}" &&
git branch -M main &&
# replace by your website repository
git remote add origin git@github.com:yxmg/tactile-ui-vue3-site.git &&
git push -f origin main &&
cd - &&
echo "部署完成，请清除缓存访问"
start https://yxmg.github.io/tactile-ui-vue3-site/index.html