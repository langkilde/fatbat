
figure(1)
hist(stepsDL,50)

figure(2)
hist(stepsPL,50)

l = length(stepsPL)
X = 1:359
figure(9)
clf
hold on
fPL = fit(X',stepsPL,'poly1')
plot(fPL, 'b', X, stepsPL, 'b.')
fDL = fit(X',stepsDL,'poly1')
plot(fDL,'r',X,stepsDL,'r.')
fPN = fit(X',stepsPN,'poly1')
plot(fPN,'k',X,stepsPL,'k.')

sum(stepsPL)
mean(stepsPL)
median(stepsPL)
max(stepsPL)



count = 0;
closest = [];
c = 10000;
for i = 1:l
    if stepsPL(i) < 10000
        currentDist = 10000-stepsPL(i)
        if currentDist < c
            c = 10000-currentDist;
            closest = [closest c];
        end
        count = count + 1;
    end
end
figure(5)
closest
count
variation = std(stepsPL)
medel = mean(stepsPL)


sum(stepsDL)
mean(stepsDL)
median(stepsDL)
max(stepsDL)
l = length(stepsDL)
count = 0;
for i = 1:l
    if stepsDL(i) > 11000
        count = count + 1;
    end
end
count


window = 40
figure(3)
clf
hold on
plot(stepsPL,'b-')
plot(smooth(stepsPL,window),'b-')
plot(stepsDL,'r-')
plot(smooth(stepsDL,window),'r-')
plot(stepsPN,'k-')
plot(smooth(stepsPN,window),'k-')