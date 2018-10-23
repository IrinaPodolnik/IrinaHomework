package com.irina.homework.service;


import com.irina.homework.domain.Employee;
import com.irina.homework.domain.Manager;
import com.irina.homework.repository.EmployeeRepository;
import com.irina.homework.repository.ManagerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class ManagerService {

    @Resource
    private ManagerRepository managerRepository;

    @Resource
    private EmployeeRepository employeeRepository;

    public void addEmployeeToManager(long managerId, long employeeId) {
        Employee employee = employeeRepository.getOne(employeeId);
        Manager manager = managerRepository.getOne(managerId);
        manager.addSubordinates(employee);
    }

    public double calculateStandardDeviation() {
        int[] employeesPerManager = managerRepository.standardDeviation();
        double sum = 0;
        for (int i : employeesPerManager) {
            sum  += i;
        }
        double length = employeesPerManager.length;
        double avg = sum / length;
        double res = 0;
        for (int i : employeesPerManager) {
            res = Math.pow(avg - i, 2) / length;
        }
        return Math.sqrt(res);

    }
}
