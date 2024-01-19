import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Bobsi from "../../assets/pdf/BOBSI.png";
// Create styles
const styles = StyleSheet.create({
  departmentHeader: {
    fontSize: "14px",
    marginBottom: "3px",
  },
  departmentInfo: {
    fontSize: "10px",
  },
  jobOrderInfo: {
    fontSize: "9px",
    margin: "1px 2px",
  },
});

// Create Document Component
export const MyDocument = ({ jobOrderView }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ height: "50%", width: "100%", padding: "5px 18px" }}>
        {/* HEADER */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "15%",
            width: "100%",
          }}
        >
          <View style={{ marginRight: 10 }}>
            <Image src={Bobsi} alt="BOBSI" style={{ height: "60px" }} />
          </View>
          <View>
            <Text style={{ fontSize: 28, fontWeight: "bold" }}>
              JOB ORDER FORM
            </Text>
          </View>
        </View>
        {/* FORM */}
        <View
          style={{
            border: "2px solid #666",
            width: "100%",
            height: "85%",
          }}
        >
          {/* JO DETAILS */}
          <View
            style={{
              border: "1px solid #666",
              width: "100%",
              height: "35%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                border: "1px solid #666",
                width: "40%",
                height: "100%",
                padding: "4px",
              }}
            >
              <Text style={styles.jobOrderInfo}>
                NATURE OF J.O. :{" "}
                {jobOrderView?.naturejoborder
                  ? jobOrderView?.naturejoborder.toUpperCase()
                  : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                DATE : {jobOrderView?.date ? jobOrderView?.date : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                CSR REPORT NO :{" "}
                {jobOrderView?.csrreportnumber
                  ? jobOrderView?.csrreportnumber
                  : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                CLIENT NAME :{" "}
                {jobOrderView?.fullname ? jobOrderView?.fullname : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                CONTACT INFO :{" "}
                {jobOrderView?.contactnumber ? jobOrderView?.contactnumber : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                NETWORK TYPE :{" "}
                {jobOrderView?.networktype ? jobOrderView?.networktype : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                ADDRESS : {jobOrderView?.address ? jobOrderView?.address : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                AREA : {jobOrderView?.area ? jobOrderView?.area : ""}
              </Text>
              <Text style={styles.jobOrderInfo}>
                JOB ORDER TYPE : {jobOrderView?.type ? jobOrderView?.type : ""}
              </Text>
            </View>
            <View
              style={{
                border: "1px solid #666",
                width: "60%",
                height: "100%",
              }}
            >
              <View
                style={{
                  border: "1px solid #666",
                  width: "100%",
                  height: "50%",
                  padding: "5px",
                }}
              >
                <Text style={styles.departmentHeader}>DESCRIPTION : </Text>
                <Text style={styles.departmentInfo}>
                  {jobOrderView?.description ? jobOrderView?.description : ""}
                </Text>
              </View>
              <View
                style={{
                  border: "1px solid #666",
                  width: "100%",
                  height: "50%",
                  padding: "5px",
                }}
              >
                <Text style={styles.departmentHeader}>MATERIALS NEEDED : </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    gap: "3px",
                  }}
                >
                  {jobOrderView?.materialsneeded.length
                    ? jobOrderView?.materialsneeded.map((material) => {
                        return (
                          <Text style={styles.jobOrderInfo}>{material}, </Text>
                        );
                      })
                    : ""}
                </View>
              </View>
            </View>
          </View>
          {/* APPROVALS */}
          <View
            style={{
              border: "1px solid #666",
              width: "100%",
              height: "30%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* CSR */}
            <View
              style={{
                border: "1px solid #666",
                width: "25%",
                height: "100%",
                padding: "2px",
              }}
            >
              <Text style={styles.departmentHeader}>CSR</Text>
              <Text style={styles.departmentInfo}>
                Name:{" "}
                {jobOrderView?.csr?.employeeincharge
                  ? jobOrderView?.csr?.employeeincharge
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>
                Status:{" "}
                {jobOrderView?.csr?.status
                  ? jobOrderView?.csr?.status.toUpperCase()
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>Remarks: </Text>
              <Text style={styles.departmentInfo}>
                {jobOrderView?.csr?.remarks ? jobOrderView?.csr?.remarks : ""}
              </Text>
            </View>
            {/* NOC */}
            <View
              style={{
                border: "1px solid #666",
                width: "25%",
                height: "100%",
                padding: "2px",
              }}
            >
              <Text style={styles.departmentHeader}>NOC</Text>
              <Text style={styles.departmentInfo}>
                Name:{" "}
                {jobOrderView?.noc?.employeeincharge
                  ? jobOrderView?.noc?.employeeincharge
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>
                Status:{" "}
                {jobOrderView?.noc?.status
                  ? jobOrderView?.noc?.status.toUpperCase()
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>Remarks: </Text>
              <Text style={styles.departmentInfo}>
                {jobOrderView?.noc?.remarks ? jobOrderView?.noc?.remarks : ""}
              </Text>
            </View>
            {/* BILLING */}
            <View
              style={{
                border: "1px solid #666",
                width: "25%",
                height: "100%",
                padding: "2px",
              }}
            >
              <Text style={{ fontSize: "12px", marginBottom: "5px" }}>
                BILLING/ACCOUNTING
              </Text>
              <Text style={styles.departmentInfo}>
                Name:{" "}
                {jobOrderView?.billing?.employeeincharge
                  ? jobOrderView?.billing?.employeeincharge
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>
                Status:{" "}
                {jobOrderView?.billing?.status
                  ? jobOrderView?.billing?.status.toUpperCase()
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>Remarks: </Text>
              <Text style={styles.departmentInfo}>
                {jobOrderView?.billing?.remarks
                  ? jobOrderView?.billing?.remarks
                  : ""}
              </Text>
            </View>
            {/* DISPATCH */}
            <View
              style={{
                border: "1px solid #666",
                width: "25%",
                height: "100%",
                padding: "2px",
              }}
            >
              <Text style={styles.departmentHeader}>DISPATCH</Text>
              <Text style={styles.departmentInfo}>
                Name:{" "}
                {jobOrderView?.dispatch?.employeeincharge
                  ? jobOrderView?.dispatch?.employeeincharge
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>
                Status:{" "}
                {jobOrderView?.dispatch?.status
                  ? jobOrderView?.dispatch?.status.toUpperCase()
                  : ""}
              </Text>
              <Text style={styles.departmentInfo}>Remarks: </Text>
              <Text style={styles.departmentInfo}>
                {jobOrderView?.dispatch?.remarks
                  ? jobOrderView?.dispatch?.remarks
                  : ""}
              </Text>
            </View>
          </View>
          {/* ACTIONS TAKEN/ACTIVATION */}
          <View
            style={{
              border: "1px solid #666",
              width: "100%",
              height: "35%",
            }}
          >
            {/* ACTIONS TAKEN // NOC ACTIVATION */}
            <View
              style={{
                border: "1px solid #666",
                width: "100%",
                height: "50%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* ACTIONS */}
              <View
                style={{
                  border: "1px solid #666",
                  width: "60%",
                  height: "100%",
                  padding: "5px",
                }}
              >
                <Text style={styles.departmentHeader}>ACTION TAKEN:</Text>
              </View>
              {/* NOC ACTIVATION//CABLE METER */}
              <View
                style={{
                  border: "1px solid #666",
                  width: "40%",
                  height: "100%",
                  padding: "2px",
                }}
              >
                {" "}
                <Text style={styles.departmentInfo}>
                  MAC MODEM # :{" "}
                  {jobOrderView?.macaddress ? jobOrderView?.macaddress : ""}
                </Text>
                <Text style={styles.departmentInfo}>CABLE METER : </Text>
                <Text style={styles.departmentInfo}>
                  IP ADDRESS :{" "}
                  {jobOrderView?.ipaddress ? jobOrderView?.ipaddress : ""}
                </Text>
                <Text style={styles.departmentInfo}>ACTIVATION DATE : </Text>
                <Text style={styles.departmentInfo}>RESOLVE DATE : </Text>
              </View>
            </View>
            {/* SIGNATURE */}
            <View
              style={{
                border: "1px solid #666",
                width: "100%",
                height: "50%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  border: "1px solid #666",
                  width: "15%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: "10px" }}>SIGNATURE:</Text>
                </View>
              </View>
              <View
                style={{
                  width: "85%",
                  height: "100%",
                  flexDirection: "row",
                }}
              >
                {/* CLIENT SIGNATURE */}
                <View
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "60%",
                      padding: "1px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginTop: "5px",
                        marginBottom: "3px",
                        fontSize: "10px",
                      }}
                    >
                      ______________________________________
                    </Text>
                    <Text style={{ fontSize: "10px" }}>CLIENT SIGNATURE</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "40%",
                      padding: "2px",
                    }}
                  >
                    <Text style={{ fontSize: "8px" }}>DATE:</Text>
                    <Text style={{ fontSize: "8px" }}>TIME ACCOMPLISHED:</Text>
                  </View>
                </View>
                {/* TECHNICAL SIGNATURE */}
                <View
                  style={{
                    width: "50%",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "60%",
                      padding: "1px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginTop: "5px",
                        marginBottom: "3px",
                        fontSize: "10px",
                      }}
                    >
                      ______________________________________
                    </Text>
                    <Text style={{ fontSize: "10px" }}>
                      TECHNICAL PERSONNEL SIGNATURE
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "40%",
                      padding: "2px",
                    }}
                  >
                    <Text style={{ fontSize: "8px" }}>DATE:</Text>
                    <Text style={{ fontSize: "8px" }}>TIME ACCOMPLISHED:</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            (please write names of staff + position who joined this J.O. at the
            back portion of this form)
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
