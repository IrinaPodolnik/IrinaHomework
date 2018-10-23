package com.irina.homework.domain;

import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("Manager")
public class Manager extends Employee {



    @OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
    private Set<Employee> subordinates = new HashSet<>();
    @OneToMany(mappedBy = "employee")
    private Set<Report> subordinatersReports = new HashSet<>();

    public Set<Report> getSubordinatersReports() {
        return subordinatersReports;
    }

    public Employee subordinatersReports(Set<Report> reports) {
        this.subordinatersReports = reports;
        return this;
    }

    public Employee addSubordinatersReports(Report report) {
        this.subordinatersReports.add(report);
        report.setEmployee(this);
        return this;
    }

    public Employee removeSubordinatersReports(Report report) {
        this.subordinatersReports.remove(report);
        report.setEmployee(null);
        return this;
    }


    public void setSubordinatersReports(Set<Report> reports) {
        this.subordinatersReports = reports;
    }

    public Set<Employee> getSubordinates() {
        return subordinates;
    }

    public Employee subordinates(Set<Employee> employees) {
        this.subordinates = employees;
        return this;
    }

    public Employee addSubordinates(Employee employee) {
        this.subordinates.add(employee);
        employee.setManager(this);
        return this;
    }

    public Employee removeSubordinates(Employee employee) {
        this.subordinates.remove(employee);
        employee.setManager(null);
        return this;
    }

    public void setSubordinates(Set<Employee> employees) {
        this.subordinates = employees;
    }

}
