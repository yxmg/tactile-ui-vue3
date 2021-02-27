cd ./dist &&
git init &&
git add . &&
time=$(date "+%Y-%m-%d %H:%M:%S") && git commit -m "feat: 更新-${time}" &&
git branch -M main &&
# replace by your website repository
git remote add origin git@github.com:yxmg/tiny-ui-vue3-website.git &&
git push -f origin main &&
cd - &&
echo "部署完成，https://yxmg.github.io/tiny-ui-vue3-website/index.html"
start https://yxmg.github.io/tiny-ui-vue3-website/index.html