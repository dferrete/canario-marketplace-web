#!/bin/bash
git checkout -b feature/ui-refinements-and-favorites main
git merge develop --no-ff -m "Merge branch 'develop' into feature/ui-refinements-and-favorites"
git checkout develop
git merge feature/ui-refinements-and-favorites --no-ff -m "Merge branch 'feature/ui-refinements-and-favorites' into develop"
git checkout main
git merge feature/ui-refinements-and-favorites --no-ff -m "Merge branch 'feature/ui-refinements-and-favorites' into main"
git push origin feature/ui-refinements-and-favorites develop main
