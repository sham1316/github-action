#!/bin/sh -l

mkdir ~/.kube/ || true
if [ -f "~/.kube/config" ]; then
  echo -e "\033[36mExisting kubeconfig found, using that and ignoring input\033[0m"
else
  echo -e "\033[36mUsing kubeconfig from input\033[0m"
  echo "${INPUT_KUBECONFIG}" > ~/.kube/config
fi

if [ -n ${INPUT_REPO_URL} ]; then
    echo -e "\033[36mAdd chart repo\033[0m"
    if [ -z  ${INPUT_REPO_USER} ]; then
      echo -e "helm repo add ${INPUT_REPO_ALIAS} ${INPUT_REPO_URL}"
      helm repo add ${INPUT_REPO_ALIAS} ${INPUT_REPO_URL}
    else
      echo -e "helm repo add ${INPUT_REPO_ALIAS} ${INPUT_REPO_URL} --username ${INPUT_REPO_USER} --password ${INPUT_REPO_PASS}"
      helm repo add ${INPUT_REPO_ALIAS} ${INPUT_REPO_URL} --username ${INPUT_REPO_USER} --password ${INPUT_REPO_PASS}
    fi
    helm repo update
fi

echo -e "\033[36mPreparing execution\033[0m"
echo "${INPUT_EXEC}" > run.sh
chmod +x ./run.sh

echo -e "\033[36mExecuting \033[0m"
output=$(./run.sh)
result=$?
echo "$output"

if [ $result -ne 0 ] ; then
  echo "Exit code: $result"
  exit 1
fi