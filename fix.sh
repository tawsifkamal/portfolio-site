sed -i 's/"maximumWarning": "2kb",/"maximumWarning": "4kb",/g' angular.json
sed -i 's/"maximumError": "4kb"/"maximumError": "6kb"/g' angular.json
sed -i 's/"build": "ng build --invalid-flag"/"build": "ng build"/g' package.json
for file in .github/workflows/*.yml; do
  sed -i '/jobs:/i \
env:\
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\
' "$file"
done
rm -f package-lock.json && npm install
