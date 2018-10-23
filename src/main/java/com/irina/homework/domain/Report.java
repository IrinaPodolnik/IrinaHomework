package com.irina.homework.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Report.
 */
@Entity
@Table(name = "report")
public class Report implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_text")
    private String reportText;

    @Column(name = "report_date")
    private LocalDate reportDate;

    @ManyToOne
    @JsonIgnoreProperties("subordinatersReports")
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Employee reportFrom;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReportText() {
        return reportText;
    }

    public Report reportText(String reportText) {
        this.reportText = reportText;
        return this;
    }

    public void setReportText(String reportText) {
        this.reportText = reportText;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public Report reportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
        return this;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Report employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee getReportFrom() {
        return reportFrom;
    }

    public Report reportFrom(Employee employee) {
        this.reportFrom = employee;
        return this;
    }

    public void setReportFrom(Employee employee) {
        this.reportFrom = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Report report = (Report) o;
        if (report.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), report.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", reportText='" + getReportText() + "'" +
            ", reportDate='" + getReportDate() + "'" +
            "}";
    }
}
