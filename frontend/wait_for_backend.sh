#!/bin/bash

wait_for_backend() {
  echo 'Waiting for the backend to become available...'
  until curl -sSf http://backend:3030/boards >/dev/null; do
    sleep 10
  done
}

wait_for_backend